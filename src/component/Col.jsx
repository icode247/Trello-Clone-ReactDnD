const Col = ({isOver,children})=>{
    const className = isOver ? "Highlight-region" : ""
    return (
      <div className={`col${className}`}></div>,
        {children}
    );
};
export default Col;