type Workout = {
  id: string;
  title: string;
  date: string;
  status_id: string;
  workout_exercises: {
    id: number;
    exercise_id: string;
    target_sets: {
      id: number;
      target_reps: number;
      target_weight: number;
    }[];
    exercises: {
      title: string;
      id: string;
    };
  }[];
  workout_statuses: {
    name: string;
  };
  workout_body_parts: {
    name: string;
  }[];
};

export { Workout };
