import axios from "axios";
import { TypeOpt, statusOpt } from "../constants"
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { createJob, setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const AddJob = () => {
  const state = useSelector(store => store.jobSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setLoading())
    axios.get("http://localhost:4000/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData.entries());

    newJob.id = v4()
    newJob.date = new Date().toLocaleDateString()

    axios.post("http://localhost:4000/jobs", newJob)
      .then(() => {
        toast.success("New job added")
        dispatch(createJob(newJob))
        navigate('/')
      })
      .catch(() => {
        toast.warn("There was an error while adding")
      })
  }

  const removeDublicates = (key) => {
    const arr = state.jobs.map((i) => i[key])
    const filteredArr = arr.filter((value, index) => arr.indexOf(value) === index)

    return filteredArr
  }

  return (
    <div className="add-page">

      <section className="add-sec">
        <h2>Add new job</h2>
        <form onSubmit={handleSubmit}>

          <div>
            <label>Position</label>
            <input
              list="positions"
              type="text"
              name="position"
              required
            />
            <datalist id="positions">
              {removeDublicates("position").map((i)=> <option value={i}/>)}
            </datalist>
          </div>

          <div>
            <label>Company</label>
            <input
              list="company"
              type="text"
              name="company"
              required
            />
            <datalist id="company">
              {removeDublicates("company").map((i)=><option value={i}/>)}
            </datalist>
          </div>

          <div>
            <label>Location</label>
            <input
              list="location"
              type="text"
              name="location"
              required
            />
            <datalist id="location">
              {removeDublicates("location").map((i) => <option value={i} />)}
            </datalist>
          </div>

          <div>
            <label >Status</label>
            <select required name="status">
              <option value="" hidden>
                Select
              </option >
              {statusOpt.map((i) => <option>{i}</option>)}
            </select>
          </div>

          <div>
            <label>Type</label>
            <select required name="type">
              <option value="" hidden>
                Select
              </option>
              {TypeOpt.map((i) => <option>{i}</option>)}
            </select>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>

        </form>
      </section>

    </div>
  )
}

export default AddJob