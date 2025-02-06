import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate an async login process
    setTimeout(() => {
      console.log('Login values:', values);
      // Replace with your actual login logic (e.g., API call)
      setSubmitting(false); // Set submitting to false after the action is completed

      // For now, navigate to home on successful login
      navigate('/home');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Login</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-2" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password:
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Your Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-2" />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-wait' : ''
                  }`}
                >
                  {isSubmitting ? 'Logging In...' : 'Login'}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
