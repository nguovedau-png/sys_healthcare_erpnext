// Simple test script to verify API calls
const API_BASE_URL = 'http://192.168.1.8:1337';

async function testCoursesAPI() {
  try {
    // First, login to get a token
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: 'admin',
        password: '123456'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    if (!loginData.jwt) {
      console.error('Failed to login');
      return;
    }

    const token = loginData.jwt;
    console.log('Token obtained:', token);

    // Now fetch courses
    const coursesResponse = await fetch(`${API_BASE_URL}/api/courses?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const coursesData = await coursesResponse.json();
    console.log('Courses response:', JSON.stringify(coursesData, null, 2));

    // Fetch a specific course
    if (coursesData.data && coursesData.data.length > 0) {
      const courseId = coursesData.data[0].id;
      console.log('Fetching course with ID:', courseId);
      
      const courseResponse = await fetch(`${API_BASE_URL}/api/courses/${courseId}?populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const courseData = await courseResponse.json();
      console.log('Course detail response:', JSON.stringify(courseData, null, 2));
    }
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testCoursesAPI();