export const JOB_LISTING_STYLE = `
          .job-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start; /* Aligns cards to the left */
            gap: 20px; /* Adds spacing between the cards */
          }
          .job-card {
            flex: 1 1 calc(33.333% - 20px); /* Three cards per row */
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            padding: 20px;
            background-color: #fff;
            box-sizing: border-box;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
            margin-bottom: 20px; /* Add spacing between rows */
          }
          .job-card:hover {
            transform: scale(1.02);
          }
          .job-title {
            font-size: 1.2em;
            margin-bottom: 10px;
            color: #333;
          }
          .job-description,
          .job-location,
          .job-skills {
            font-size: 1em;
            color: #666;
            margin-bottom: 10px;
          }
          .skills-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
          }
          .skills-list li {
            background-color: #f1f1f1;
            border-radius: 3px;
            padding: 5px 10px;
            margin: 5px;
            font-size: 0.9em;
          }
          .apply-job-btn {
            background-color: #107517;
            color: white;
            border: 1px solid #107517;
            border-radius: 3px;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.3s;
          }
          .apply-job-btn:hover {
            background-color: #ffff;
            color: #107517
          }
  
          /* Media Queries */
          @media (max-width: 992px) {
            .job-card {
              flex: 1 1 calc(50% - 20px); /* Two cards per row */
            }
          }
          @media (max-width: 768px) {
            .job-card {
              flex: 1 1 100%; /* One card per row */
            }
          }
        `;

export const jobListingContent = (jobs) => {
  let htmlContent = "";
  jobs.forEach((job) => {
    let skillsHtml = "";
    if (job.job_skills && job.job_skills.length > 0) {
      skillsHtml =
        "<ul class='skills-list' data-gjs-droppable='false' data-gjs-editable='false' data-gjs-removable='false' data-gjs-copyable='false'>";
      job.job_skills.forEach((skill) => {
        skillsHtml += `<li data-gjs-droppable='false' data-gjs-editable='false' id="skill-match" data-gjs-removable='false' data-gjs-copyable='false'>${skill.skill_name} (${skill.weight})</li>`;
      });
      skillsHtml += "</ul>";
    }

    htmlContent += `
              <div class="job-card" id="job-card" data-gjs-droppable="false" data-gjs-editable="false" data-gjs-removable="false" data-gjs-copyable="false">
                <h3 class="job-title" id="job-title" data-gjs-droppable="false" data-gjs-editable="false" data-gjs-removable="false" data-gjs-copyable="false">${job.title}</h3>
                <p class="job-description" id="job-description" data-gjs-droppable="false" data-gjs-editable="false" data-gjs-removable="false" data-gjs-copyable="false">${job.description}</p>
                <p class="job-location" id="job-location" data-gjs-droppable="false" data-gjs-editable="false" data-gjs-removable="false" data-gjs-copyable="false">
                  <strong>Location:</strong> ${job.job_location}
                </p>
                <p class="job-skills" id="job-skills" data-gjs-droppable="false" data-gjs-editable="false" data-gjs-removable="false" data-gjs-copyable="false">
                  <strong>Skills Required:</strong> ${skillsHtml}
                </p>
                <button class="apply-job-btn" id="apply-more" data-job-id="${job.id}" data-gjs-copyable="false">Apply Now</button>
              </div>
            `;
  });

  return `
            <div id="job-card-wrapper" data-gjs-droppable="false" data-gjs-editable="false" data-gjs-removable="false" data-gjs-copyable="false">
              ${htmlContent}
            </div>`;
};

export const jobFilter = () => {
  return `<div id ="job-filter">
    <div>
      <label htmlFor="select1">Job Skills:</label>
      <select id="select1" value={select1} onChange={handleSelect1Change}>
        <option value="" hidden>--Select Skill--</option>
        <option value="option1">Java Script</option>
        <option value="option2">Java</option>
      </select>
    </div>

    <div>
      <label htmlFor="select2">Select Job Type:</label>
      <select id="select2" value={select2} onChange={handleSelect2Change}>
        <option value="" hidden>--Select job type--</option>
        <option value="Hybrid">Hybrid</option>
      </select>
    </div>

    <div>
      <label htmlFor="input">Input Text:</label>
      <input
        type="text"
        id="input"
        placeholder="Search"
        onChange={handleInputChange}
      />
    </div>
  </div>`
};

export const singleJobContent = (jobs) => {
  let htmlContent = "";
  jobs.forEach((job) => {
    let skillsHtml = "";
    if (job.job_skills && job.job_skills.length > 0) {
      skillsHtml =
        "<ul class='skills-list' data-gjs-editable='false' data-gjs-removable='false'>";
      job.job_skills.forEach((skill) => {
        skillsHtml += `<li data-gjs-editable='false' data-gjs-removable='false'>${skill.skill_name} (${skill.weight})</li>`;
      });
      skillsHtml += "</ul>";
    }

    htmlContent += `
            <div class="job-card" data-gjs-editable="false" data-gjs-removable="false">
              <h3 class="job-title" data-gjs-editable="false" data-gjs-removable="false">${job.title}</h3>
              <p class="job-description" data-gjs-editable="false" data-gjs-removable="false">${job.description}</p>
              <p class="job-location" data-gjs-editable="false" data-gjs-removable="false">
                <strong>Location:</strong> ${job.job_location}
              </p>
              <p class="job-skills" data-gjs-editable="false" data-gjs-removable="false">
                <strong>Skills Required:</strong> ${skillsHtml}
              </p>
              <button class="apply-job-btn" data-job-id="${job.id}">Apply Now</button>
            </div>
          `;
  });

  return htmlContent;
};
