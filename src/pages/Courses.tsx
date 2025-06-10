import React from 'react';
import Button from '../components/Button';
import { theme } from '../theme';

const courseData = [
    {
        title: "Python Fundamentals",
        description: "Learn the basics of Python programming, including variables, loops, and functions. Perfect for beginners!",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF7vDyD8znUl9Iq4RLAraN5lc_48azqk-bHSGHq7nszaGSykckIaVlXyhUVLPnkRokvUDxIIvNgic8g2-OKK45f0vKzYennfsuePm0xMfEOloMGZ8SYf-rQ6dZxwQO8nvvQcvtCN8ytMjaJsq2xwIqbHWqiGlPPWnTIbSI_1sd8mvBHiOKRcntVETD2koZ91Z-1ywLU2ZFHpPPSS33x9URiBY5NapaLi-n2FFvNLdaZrfsqb7JU2Vxi6Q4BFOl8wBHfsFVD0_A7Zm5"
    },
    {
        title: "Web Development with JavaScript",
        description: "Dive into web development with JavaScript. Build interactive websites and learn about front-end frameworks.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlKGTm5F3mFJrqyC4oIeBfvXxPPod0ZMx5ALk39P8t0fpbNFs0hLSieDMl-npTI2F4FkQfDBGV2NFDDqhhKXD98V0DS1NijOrRJev_xI9RREP_ONY9I5CXsPzsYBE6TMe1tRMr9mkO3oc9V1UCEbs78OlNkUGJtmh7Zb-R8AMQKLGRoPRN-yhgi-cDq3dcuizjtXZN8htGRq3Hw33q6DvneYXqY3H-65K5DRK_XWb-9oCeiGXKcz3ZGjWZWj5K01PR04JA6wwH0Q3R"
    },
    {
        title: "Mobile App Development with Swift",
        description: "Create your own mobile apps for iOS using Swift. Learn about UI design and app logic.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADNUjIS3Dn31grHXl9TIJ9b3yUabwYJ0UA9KuCix7bt9Tr96JxQ5xzhUNsF3QLnhK4jw3g5j_C6IXT9YVyWHaybBcvMaM4O2cG0lvl6929j5sFwtEXup-pgDZOr2luu-Oux_cqFMV8R2cNQTRZ_3PNOW6VJrHtGtKOcNBM1ghLqo3UNQ_E34ZQe1h0wxXUuHzQeM40NBZDy_qRUnABnNoB6B_AU7cc__XFCgFvWknl4OY0GTE3xFeC9Lo6rk1dHew9s4g4hu5YRa1x"
    },
    {
        title: "Game Development with C#",
        description: "Develop your own games using C# and a popular game engine. Learn about game mechanics and design.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKuL4hcHLafPpcD5Bs-3Ew4Jm49epjm6I0-BgCWPAVXqce-STvUgYVWSTRGVII-BkX85v0__-9g_kvrFU9fBt_RR72BBW_vqHt_LG4BxJmku9HdCZCeNGAeTLt-EXgs7p0fcHUvcCjvOnjn7r18W_Y3cbTP16pf656MuRoDz_ypmnlg_LD4mFxbd5w-4k-_LyPxll_S9VXrFEO0rF3GpC6o4m0hqFmRzWsd2ZD58UKsx4Vrroiapr2USkjCyvJeoXHZEGMSjSb6_1P"
    }
];

const CourseCard: React.FC<{
    title: string;
    description: string;
    image: string;
}> = ({ title, description, image }) => {
    return (
        <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl bg-[rgb(40,48,57)] p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-white text-base font-bold leading-tight">{title}</p>
                        <p className="text-[#9caaba] text-sm font-normal leading-normal">
                            {description}
                        </p>
                    </div>
                    <Button size="sm" variant="primary" className="w-fit">
                        <span className="truncate">Enroll Now</span>
                    </Button>
                </div>
                <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                    style={{ backgroundImage: `url('${image}')` }}
                />
            </div>
        </div>
    );
};

const Courses: React.FC = () => {
    return (
        <div className={`relative flex min-h-screen flex-col`} style={{ background: theme.colors.background.main, fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                        <div className="flex min-w-72 flex-col gap-3">
                            <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                                Available Courses
                            </p>
                            <p className="text-[#9caaba] text-sm font-normal leading-normal">
                                Explore our curated list of programming courses designed for teens. Start your coding journey today!
                            </p>
                        </div>
                    </div>
                    {courseData.map((course, index) => (
                        <CourseCard
                            key={index}
                            title={course.title}
                            description={course.description}
                            image={course.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses; 