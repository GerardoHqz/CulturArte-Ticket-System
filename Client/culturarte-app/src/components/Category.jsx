function Category(props) {
  return (
    <div
      class="rounded-md w-max px-3 py-1 text-white font-semibold"
      style={{ backgroundColor: `${props.bgColor}` }}
    >
      {props.category}
    </div>
  );
}
export default Category;
