import { useEffect, useState } from "react"
import { TypeOpt, sortOpt, statusOpt } from "../constants"
import { useDispatch } from "react-redux"
import { clearFilters, filterBySearch, sortJobs } from "../redux/slices/jobSlice"

const Filter = ({ jobs }) => {

  const dispatch = useDispatch()

  const [text, setText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: "position", text }))
    }, 500)

    return () => clearTimeout(timer)
  }, [text])

  return (
    <div>
      <section className="filter-sec">
        <h2>Filtering Form</h2>

        <form >
          <div>
            <label>Search by position:</label>
            <input
              onChange={(e) => setText(e.target.value)}
              type="text"
            />
          </div>

          <div>
            <label >Status</label>
            <select onChange={(e) => dispatch(filterBySearch({
              field: "status",
              text: e.target.value
            }))}>
              <option value="" hidden>
                Select
              </option >
              {statusOpt.map((i) => <option>{i}</option>)}
            </select>
          </div>

          <div>
            <label>Type</label>
            <select onChange={(e) => dispatch(filterBySearch({
              field: "type",
              text: e.target.value
            }))}
            >
              <option value="" hidden>
                Select
              </option>
              {TypeOpt.map((i) => <option>{i}</option>)}
            </select>
          </div>

          <div>
            <label>Sort</label>

            <select
              onChange={(e) => dispatch(sortJobs(e.target.value))}>
              {sortOpt.map((i) => <option>{i}</option>)}
            </select>


          </div>

          <div>
            <button onClick={() => dispatch(clearFilters())}
              type="reset">Reset Filter</button>
          </div>

        </form>
      </section>
    </div>
  )
}

export default Filter