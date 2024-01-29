import { useDispatch, useSelector } from "react-redux"
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import Loader from "../components/Loader"
import Cards from "../components/Cards"
import Filter from "../components/Filter"


const JobList = () => {
  const dispatch = useDispatch()
  const state = useSelector((store) => store.jobSlice)

  const fetchData = () => {
    dispatch(setLoading())
    axios.get("http://localhost:4000/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)))
  }

  useEffect(() => {
    fetchData()
  }, [])

  Filter
  return (
   
    <div className="list-page">

      <Filter jobs={state.jobs} />


      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <div className="error">
          <p>
            Sorry, there was a problem accessing the data
            <span>{state.isError}</span>
          </p>
          <button className="try" onClick={fetchData}>Try Again</button>
        </div>
      ) : (
        <div className="job-list">
          {state.jobs.map((job) =>
            <Cards job={job} key={job.id}/>
          )}
        </div>
      )}
    </div>
  );

}

export default JobList