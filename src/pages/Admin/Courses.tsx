import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Course } from '../../types';
import { theme } from '../../theme';
import { courseService } from '../../services/courseService';
import { getResponsiveContainer } from '../../utils/responsive';

const AdminCourses: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses');
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewCourse = () => {
    navigate('/admin/courses/new');
  };

  const handleEditCourse = (courseId: string) => {
    navigate(`/admin/courses/edit/${courseId}`);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(courseId);
        setCourses(courses.filter(course => course.id !== courseId));
      } catch (err) {
        setError('Failed to delete course');
        console.error('Error deleting course:', err);
      }
    }
  };

  // If user is not admin, redirect to home
      if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121416]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121416]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{
        background: theme.colors.background.main,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2c3035] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">CodeCraft</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-white text-sm font-medium leading-normal" href="/admin">Dashboard</a>
              <a className="text-white text-sm font-medium leading-normal" href="/admin/courses">Courses</a>
              <a className="text-white text-sm font-medium leading-normal" href="/admin/users">Users</a>
              <a className="text-white text-sm font-medium leading-normal" href="/admin/analytics">Analytics</a>
            </div>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#2c3035] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <div className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                </svg>
              </div>
            </button>
                            {user?.foto_de_perfil && (
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{ backgroundImage: `url(${user.foto_de_perfil})` }}
                  />
                )}
          </div>
        </header>
        <div className={getResponsiveContainer()}>
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Courses</p>
              <button
                onClick={handleNewCourse}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#2c3035] text-white text-sm font-medium leading-normal"
              >
                <span className="truncate">New Course</span>
              </button>
            </div>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#40474f] bg-[#121416]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#1e2124]">
                      <th className="table-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                        Course Title
                      </th>
                      <th className="table-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                        Description
                      </th>
                      <th className="table-column-360 px-4 py-3 text-left text-white w-60 text-[#a2abb3] text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="border-t border-t-[#40474f]">
                        <td className="table-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                          {course.title}
                        </td>
                        <td className="table-column-240 h-[72px] px-4 py-2 w-[400px] text-[#a2abb3] text-sm font-normal leading-normal">
                          {course.description}
                        </td>
                        <td className="table-column-360 h-[72px] px-4 py-2 w-60 text-[#a2abb3] text-sm font-bold leading-normal tracking-[0.015em]">
                          <button
                            onClick={() => handleEditCourse(course.id)}
                            className="text-blue-400 hover:text-blue-300 mr-2"
                          >
                            Edit
                          </button>
                          |
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-400 hover:text-red-300 ml-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <style>
                {`
                  @container(max-width:120px){.table-column-120{display: none;}}
                  @container(max-width:240px){.table-column-240{display: none;}}
                  @container(max-width:360px){.table-column-360{display: none;}}
                `}
              </style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses; 