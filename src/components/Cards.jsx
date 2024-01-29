import axios from "axios"
import Remove from "./Remove"
import { BsFillCalendarDateFill } from "react-icons/bs"
import { FaSuitcase } from "react-icons/fa"
import { MdLocationOn } from "react-icons/md"
import { toast } from "react-toastify"
import { deleteJob } from "../redux/slices/jobSlice"
import { useDispatch } from "react-redux"



const Cards = ({ job }) => {
const dispatch = useDispatch()

  const color = {
    Interview: "green",
    Reject: "red",
    Continues: "orange"
  }

  const handleDelete = ()=>{
axios.delete(`http://localhost:4000/jobs/${job.id}`)
.then(()=>{
  toast.info("Deleted successfully")
  dispatch(deleteJob(job.id))
})
.catch(()=>{
  toast.warn("There was an error while deleting")
})
  }


  return (
    <div className="card">

      <div className="head">

        <div className="left">
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>

          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>

        <div className="right">
          <button className="dlBtn">
            <Remove handleDelete ={handleDelete} />
          </button>
        </div>
      </div>


      <div className="body">

        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>
        <div className="field">
          <BsFillCalendarDateFill />
          <p>{job.date}</p>
        </div>
        <div className="status">
          <p style={{ background: color[job.status] }}>{job.status}</p>
        </div>

      </div>
    </div>
  )
}

export default Cards