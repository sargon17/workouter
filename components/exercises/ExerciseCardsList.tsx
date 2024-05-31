
type ExerciseCardsListProps = {
  children?: React.ReactNode | React.ReactNode[];
};


type ExerciseActionsProps = {
  children: React.ReactNode;
};

type NoExercisesProps = {
  children?: React.ReactNode;
};

const ExerciseCardsList = (props: ExerciseCardsListProps) => {
  return <div className="flex flex-col gap-2 justify-start items-center mt-4">{props.children}</div>;
};


const ExerciseActions = (props: ExerciseActionsProps) => {
  return <div className="flex gap-2">{props.children}</div>;
};
const NoExercises = (props: NoExercisesProps) => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center flex-col gap-1">
      <p className=" text-stone-500">No exercises added yet</p>
      {props.children}
    </div>
  );
};



export {
  ExerciseCardsList,
  ExerciseActions,
  NoExercises,
};

