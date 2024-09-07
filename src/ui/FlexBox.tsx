type FlexBoxTypes = {
  children: React.ReactNode;
  className: string;
};

function FlexBox({ children, className }: FlexBoxTypes) {
  return <div className={`flex ${className}`}>{children}</div>;
}

export default FlexBox;
