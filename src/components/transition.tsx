import {cn} from '@/lib/ui';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Transition = (props: Props) => {
  return (
    <div className={cn('animate-fade-in', props.className)}>
      {props.children}
    </div>
  );
};

export default Transition;
