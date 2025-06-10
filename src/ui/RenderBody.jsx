import Empty from "./Empty";

function RenderBody({ data, render }) {
  if (!data.length) return <Empty />;

  return <div>{data.map(render)}</div>;
}

export default RenderBody;
