import React from 'react'
import CommonInput from '../../../components/atomic/CommonInput'
import { Button } from 'react-bootstrap';
import { FaFilter, FaStar } from 'react-icons/fa6';
import { IoAddOutline } from 'react-icons/io5';

const RecommendationAI = ({
    control,
    setSelectedRecommend,

}) => {
    const recommendations = [
        {
          id: 1,
          text: 'Developed a responsive web application using React and Bootstrap.',
          isExpertRecommended: true,
        },
        {
          id: 2,
          text: 'Implemented RESTful APIs with Node.js and Express.',
          isExpertRecommended: true,
        },
        {
          id: 3,
          text: 'Built dynamic user interfaces with Vue.js and Vuex.',
          isExpertRecommended: true,
        },
        {
          id: 4,
          text: 'Designed and optimized database schemas using MongoDB.',
          isExpertRecommended: false,
        },
        {
          id: 5,
          text: 'Created interactive charts and visualizations using D3.js.',
          isExpertRecommended: false,
        },
        {
          id: 6,
          text: 'Integrated third-party services and APIs for enhanced functionality.',
          isExpertRecommended: false,
        },
      ];

      const skillRecommendations = [
        {
          id: 1,
          text: 'JavaScript',
          isExpertRecommended: true,
        },
        {
          id: 2,
          text: 'Django',
          isExpertRecommended: true,
        },
        {
          id: 3,
          text: 'Ruby on Rails',
          isExpertRecommended: true,
        },
        {
          id: 4,
          text: 'Laravel',
          isExpertRecommended: false,
        },
        {
          id: 5,
          text: 'Nest.js',
          isExpertRecommended: false,
        },
        {
          id: 6,
          text: 'TypeScript',
          isExpertRecommended: false,
        },
      ];

      let currentStep = localStorage.getItem('clientActiveStep');

      const handleRecommendation=(item)=>{
        console.log(item,"kk")
        const itemToSet = currentStep === '4' ? {label: item.text, value: item.text} : item.text
        console.log(itemToSet,"itemToSet")
        setSelectedRecommend(itemToSet);
      }

  return (
   <>
    <div>
          {/* <div className="search-filter mb-3">
            <CommonInput
              label="Search By Job Title For Pre-Written Examples"
              name="search"
              type="text"
              control={control}
              invalidFieldRequired={true}
              placeholder="Search by job Title"
            />
          </div> */}
          {/* <div className="showing-results-wrapper mb-3">
            <div>
              <p className="font-14 mb-0">Showing results for</p>
              <p className="font-14 mb-0 fw-semibold">Web Developer</p>
            </div>
            <div>
              <Button
                variant="transparent"
                className="p-0 border-0 shadow-none text-green fw-semibold"
              >
                Filter by keyword <FaFilter />{" "}
              </Button>
            </div>
          </div> */}
          {/* <CommonInput
            label=""
            name="search"
            type="text"
            control={control}
            invalidFieldRequired={true}
            placeholder="Search keywords"
          /> */}
          <div className="recommended-desc">
            {(currentStep === '4' ? skillRecommendations: recommendations).map((item) => (
              <div key={item.id} className="d-flex align-items-center gap-3" onClick={()=>handleRecommendation(item)}>
                <Button
                  variant="transparent"
                  className="arrow-btn primary-arrow shadow-none"
                >
                  <IoAddOutline />
                </Button>
                <div>
                  {item.isExpertRecommended && (
                    <p className="font-14 fw-medium mb-1">
                      <FaStar /> Expert Recommended
                    </p>
                  )}
                  <p className="font-14 mb-0">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
   </>
  )
}

export default RecommendationAI