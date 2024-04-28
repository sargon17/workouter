"use client";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush,
} from "recharts";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import { format } from "date-fns";

import { motion } from "framer-motion";

type Exercise = {
  id: string;
  title: string;
};

export default function Statistics() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  //   const [chart, setChart] = useState([]);
  //   const [chartWeight, setChartWeight] = useState([]);
  //   const [chartReps, setChartReps] = useState([]);
  const [chartTotal, setChartTotal] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    getExercises();
  }, []);

  useEffect(() => {
    if (selectedExercise) {
      getChartData();
    }
  }, [selectedExercise]);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  const getChartData = async () => {
    console.log("selectedExercise", selectedExercise);
    const user = await getUser();

    const { data, error } = await supabase
      .from("workouts")
      .select("id, date, workout_exercises(exercise_id, sets(reps, weight))")
      .eq("user_id", user?.id)
      .eq("workout_exercises.exercise_id", selectedExercise)
      .not("workout_exercises", "is", null)
      .not("workout_exercises.sets", "is", null)
      .order("date", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      const chartData = data.map((workout) => {
        return {
          date: format(workout.date, "dd MMMM"),
          exercises: workout.workout_exercises.map((exercise) => {
            return exercise.sets.map((set) => {
              return {
                reps: set.reps,
                weight: set.weight,
              };
            });
          }),
        };
      });

      // total is reps * weight * sets

      //return  format [{date: "2021-10-10", total: 100}, {date: "2021-10-11", total: 200}]

      let chartTotal = chartData.map((workout) => {
        return {
          date: workout.date,
          total: workout.exercises
            .map((exercise) => {
              return exercise
                .map((set) => {
                  return set.reps * set.weight;
                })
                .reduce((acc, curr) => acc + curr, 0);
            })
            .flat(),
        };
      });

      setChartTotal(chartTotal.flat().flat() as any);

      //   setChart(data);
    }
  };

  const getExercises = async () => {
    const user = await getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("workouts")
      .select(" workout_exercises( exercises(title, id))")
      .eq("user_id", user.id);
    if (error) {
      console.error(error);
    } else {
      // filter all the exercises (title, id) that the user has done without duplicates
      const exercises = data.map((workout) => {
        return workout.workout_exercises.map((exercise) => {
          return exercise.exercises;
        });
      });

      const uniqueExercises: any = exercises.flat().filter((exercise: any, index, self) => {
        return index === self.findIndex((t: any) => t.id === exercise.id);
      });

      setExercises(uniqueExercises as Exercise[]);
    }
  };

  return (
    <div>
      <Select onValueChange={(value) => setSelectedExercise(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a exercise" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Exercises</SelectLabel>
            {exercises.map((exercise) => (
              <SelectItem
                key={exercise.id + exercise.title}
                value={exercise.id}
              >
                {exercise.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            Statistics for {exercises.find((exercise) => exercise.id === selectedExercise)?.title}
          </h2>
        </div>

        <ChartGrid>
          <Chart
            dataKey="total"
            data={chartTotal}
          />
        </ChartGrid>
      </div>
    </div>
  );
}

type ChartGridProps = {
  children: React.ReactNode | React.ReactNode[];
};

const ChartGrid = (props: ChartGridProps) => {
  return <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">{props.children}</div>;
};

type ChartProps = {
  dataKey: string;
  data: any;
};

const Chart = (props: ChartProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="w-full border border-stone-800 rounded-xl p-4">
      <div className="mb-4">
        <div className="flex gap-2">
          <h3 className="text-xl font-bold">Total weight lifted</h3>
          <span
            className="underline cursor-pointer text-xs text-muted-foreground flex items-center"
            onClick={() => setIsInfoOpen(!isInfoOpen)}
          >
            What is this?
          </span>
        </div>
        <motion.p
          className={cn(
            "block text-xs text-muted-foreground items-center mb-2 text-stone-500 overflow-hidden transition-all duration-300 ease-in-out"
          )}
          initial={{ height: 0 }}
          animate={{ height: isInfoOpen ? "50px" : 0 }}
        >
          Total weight lifted per exercise per workout is calculated by multiplying the reps by the weight
          lifted. It's an indicator of the total effort put in a workout session. By tracking this metric, you
          can see your overall progress over time.
        </motion.p>
      </div>
      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={props.data}>
          <CartesianGrid
            strokeDasharray="4 3"
            opacity={0.05}
          />
          <XAxis
            dataKey="date"
            interval={"equidistantPreserveStart"}
            tickFormatter={(value) => format(new Date(value), "dd MMM")}
            tickSize={10}
            tickMargin={10}
            domain={["dataMin", "dataMax"]}
            height={50}
          />
          <YAxis
            tickCount={4}
            domain={[0, (dataMax: any) => dataMax + dataMax / 4]}
            tickFormatter={(value) => `${value} kg`}
          />
          <Brush
            dataKey={"date"}
            height={10}
            stroke="#84cc1677"
            fill="#84cc1601"
            tickFormatter={(value) => format(new Date(value), "dd MMM")}
            travellerWidth={10}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1a202c",
              border: "none",
              color: "#e2e8f0",
            }}
          />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: "20px" }}
          />

          <Line
            type="monotoneX"
            dataKey={props.dataKey}
            stroke="#84cc16"
            activeDot={{ r: 4 }}
            legendType="circle"
            dot={false}
            strokeWidth={2}
            name="Total weight lifted (kg) per workout"
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
