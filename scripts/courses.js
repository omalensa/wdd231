// Course List Array (from the course materials – adjust completed flags for yourself)
const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming...',
    technology: ['Python'],
    completed: true   // change to true/false for you
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: '...',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: '...',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: '...',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: '...',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Web Frontend Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: '...',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false   // current course
  }
];

const courseList = document.getElementById('course-list');
const creditSpan = document.querySelector('#credit-total span');
const buttons = document.querySelectorAll('.filter-buttons button');

function displayCourses(courseArray) {
  courseList.innerHTML = '';
  courseArray.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) card.classList.add('completed');
    card.textContent = `${course.subject} ${course.number}`;
    // Optional: add title on hover or expand later
    courseList.appendChild(card);
  });

  // Total credits with reduce
  const total = courseArray.reduce((sum, course) => sum + course.credits, 0);
  creditSpan.textContent = total;
}

// Initial load – All
displayCourses(courses);

// Filter buttons
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    let filtered = courses;
    if (btn.id === 'cse') {
      filtered = courses.filter(c => c.subject === 'CSE');
    } else if (btn.id === 'wdd') {
      filtered = courses.filter(c => c.subject === 'WDD');
    }
    displayCourses(filtered);
  });
});