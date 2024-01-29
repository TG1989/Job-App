const Remove = ({handleDelete}) => {
  return (
    <div>
      <button onClick={handleDelete} className="bin-button">
        <img src="/item1.svg" className="bin-top" />
        <img src="/item2.svg" className="bin-bottom" />
        <img src="-image3.svg" className="garbage" />
      </button>
    </div>
  )
}

export default Remove