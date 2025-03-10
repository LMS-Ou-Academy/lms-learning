import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from './../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import YouTube from 'react-youtube';

const CourseDetails = () => {

  const { id } = useParams()

  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null)
  const { allCourses, calculateRating, calculateNoOfLectures, calculateCourseDuration, calculateChapterTime, currency } = useContext(AppContext)
  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse);
  }


  useEffect(() => {
    fetchCourseData()
  }, [allCourses])

  const toggleSection = (index) => {
    setOpenSections((prev) => (
      {
        ...prev,
        [index]: !prev[index],
      }
    ))
  }

  return courseData ? (
    <>
      <div className='relative flex flex-col-reverse items-start justify-between gap-10 px-8 pt-20 text-left md:flex-row md:px-36 md:pt-30'>
        <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>
        {/* left column */}
        <div className='z-10 max-w-xl text-gray-500'>
          <h1 className='font-semibold text-gray-800 md:text-course-details-heading-large text-course-details-heading-small'>{courseData.courseTitle}</h1>
          <p className='pt-4 text-sm md:text-base' dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>

          {/* review and ratings */}
          <div className='flex items-center pt-3 pb-1 space-x-2 text-sm'>
            <div className="flex items-center space-x-2">
              <p>{(calculateRating(courseData))}</p>
              <div className='flex'>{[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="" className='w-3.5 h-3.5' />))}
              </div>
            </div>
            <p className='text-blue-600'>({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? 'ratings' : ' rating'})</p>

            <p className=''>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
          </div>
          <p className='text-sm'>
            Course by <span className='text-blue-600 underline'>Ou-Academy</span>
          </p>

          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>
            <div className='pt-5'>
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className='mb-2 bg-white border border-gray-300 rounded'>
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                    <div className='flex items-center gap-2'>
                      <img src={assets.down_arrow_icon} className={`transform transition-transform duration-300 ${openSections[index] ? 'rotate-180' : ''}`} alt="arrow-icon" />
                      <p className='text-sm font-medium md:text-base'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`} >
                    <ul className='py-2 pl-4 pr-4 text-gray-600 list-disc border-t border-gray-300 md:pl-10'>
                      {
                        chapter.chapterContent.map((lecture, i) => (
                          <li key={i} className='flex items-start gap-2 py-1'>
                            <img src={assets.play_icon} alt="play-icon" className='w-4 h-4 mt-1' />
                            <div className='flex items-center justify-between w-full text-xs text-gray-800 md:text-default'>
                              <p>{lecture.lectureTitle}</p>
                              <div className='flex gap-2'>
                                {
                                  lecture.isPreviewFree && <p
                                  onClick={()=>setPlayerData({
                                    videoId: lecture.lectureUrl.split('/').pop()
                                  })}
                                   className='text-blue-500 cursor-pointer'>Preview</p>
                                }
                                <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                              </div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
            <p className='pt-3' dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></p>
          </div>
        </div>

        {/* right column */}
        <div className='z-10 overflow-hidden bg-white rounded-t shadow-custom-card md:rounded-none max-w-course-card min-w-[300px] sm:min-w-[420px]:'>
          {
            playerData ?
                <YouTube videoId={playerData.videoId} opts={{playerVars:{autoplay: 1}}} iframeClassName='w-full aspect-video' />
          : <img src={courseData.courseThumbnail} alt="" />
          }
          <div className='p-5'>
            <div className='flex items-center gap-2'>
              
                <img className='w-3.5' src={assets.time_left_clock_icon} alt="" />
              
              <p className='text-red-500'><span className='font-medium'>5 days</span> left at this price!</p>
            </div>
            <div className='flex items-center gap-3 pt-2'>
              <p className='text-2xl font-semibold text-gray-800 md:text-4xl'>{currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
              <p className='text-gray-500 line-through md:text-lg'>{currency}{courseData.coursePrice}</p>
              <p className='text-gray-500 md:text-lg'>{courseData.discount}% off</p>
            </div>
            <div className="flex items-center gap-4 pt-2 text-sm text-gray-500 md:text-default md:pt-4">
              <div className='flex items-center gap-1'>
                <img src={assets.star} alt="star-icon" className='' />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className='w-px h-4 bg-gray-500/40'></div>

              <div className='flex items-center gap-1'>
                <img src={assets.time_clock_icon} alt="clock-icon" className='' />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className='w-px h-4 bg-gray-500/40'></div>

              <div className='flex items-center gap-1'>
                <img src={assets.lesson_icon} alt="clock-icon" className='' />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>

            </div>
            <button className='w-full py-3 mt-4 font-medium text-white bg-blue-600 rounded md:mt-6'>{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll now'}</button>
            <div className='pt6 '>
              <p className='text-lg font-medium text-gray-800 md:text-xl'>What's in the course?</p>
              <ul className='pt-2 ml-4 text-sm text-gray-500 list-disc md:text-default'>
                <li>Leftime access with free updates.</li>
                <li>step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowladge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  ) : <Loading />
};

export default CourseDetails;