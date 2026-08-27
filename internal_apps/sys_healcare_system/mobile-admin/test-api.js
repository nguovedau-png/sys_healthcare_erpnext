// Simple test script to verify API calls
const API_BASE_URL = process.env.API_BASE_URL;
const TEST_USER_IDENTIFIER = process.env.TEST_USER_IDENTIFIER;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

if (!API_BASE_URL || !TEST_USER_IDENTIFIER || !TEST_USER_PASSWORD) {
  throw new Error('Set API_BASE_URL, TEST_USER_IDENTIFIER and TEST_USER_PASSWORD before running this script');
}

async function testCoursesAPI() {
  try {
    // First, login to get a token
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: TEST_USER_IDENTIFIER,
        password: TEST_USER_PASSWORD
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