import { ExerciseCard, ExerciseCardBody, ExerciseCardHeader } from "../card/ExerciseCard";

const fakeExercises = [
  {
    id: "fake-exercise-1",
    title: "Bench Press",
    target_sets: [
      {
        id: 0,
        target_reps: 8,
        target_weight: 100,
      },
      {
        id: 1,
        target_reps: 8,
        target_weight: 100,
      },
      {
        id: 2,
        target_reps: 9,
        target_weight: 100,
      },
      {
        id: 3,
        target_reps: 7,
        target_weight: 100,
      },
    ],
  },
  {
    id: "fake-exercise-2",
    title: "Bicep Curl",
    target_sets: [
      {
        id: 0,
        target_reps: 8,
        target_weight: 20,
      },
      {
        id: 1,
        target_reps: 8,
        target_weight: 20,
      },
      {
        id: 2,
        target_reps: 9,
        target_weight: 20,
      },
      {
        id: 3,
        target_reps: 7,
        target_weight: 20,
      },
    ],
  },
];

export default function NoExercisesList() {
  return (
    <div className="flex flex-col gap-2 justify-start items-center mt-4 relative overflow-hidden">
      {fakeExercises.map((exercise: any) => (
        <ExerciseCard
          key={exercise.title + "-no-exercises"}
          layoutId={exercise.title + "_card-no-exercises"}
        >
          <ExerciseCardHeader
            title={exercise.title}
            workout_exercise_id={exercise.id}
          />
          <ExerciseCardBody
            target_sets={exercise.target_sets}
            workout_exercise_id={exercise.id}
          />
        </ExerciseCard>
      ))}
      <div className="absolute inset-0 flex justify-center items-center py-2 bg-gradient-to-t from-stone-950 from-40% ">
        <p className="text-stone-50">No exercises added yet</p>
      </div>
    </div>
  );
}
