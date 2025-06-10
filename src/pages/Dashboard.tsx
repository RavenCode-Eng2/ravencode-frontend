import React from 'react';
import { theme } from '../theme';
import ModuleCard from '../components/ModuleCard';
import ProgressCard from '../components/ProgressCard';

const Dashboard: React.FC = () => {
    return (
        <div className={`px-40 flex flex-1 justify-center py-5 bg-[${theme.colors.background.main}]`}>
            <div className={`layout-content-container flex flex-col ${theme.spacing.container.max} flex-1`}>
                <h2 className={`${theme.typography.heading.h1} text-${theme.colors.text.primary} px-4 text-left pb-3 pt-5`}>
                    Welcome back, Sarah!
                </h2>

                {/* Continue Your Adventure Section */}
                <div className={theme.spacing.padding.page}>
                    <ProgressCard
                        title="Continue Your Adventure"
                        description="Resume your progress in the 'Python Fundamentals' module and unlock new achievements."
                        buttonText="Continue"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuAtl8VOzf8xHssnKtXBSJqBQjkuWFeAYO6MebixkG1Zqfenw6T2-NvLCWEtRn35MrFOA0BegYR0356R9aPmE713kLjKd1S8yEUhxazGsEJJY1ENS_oIo5-q7PcSxD-JTDEygR4sRZQLdQK1RfZ2vwY_y5G_hem-2ieBAuu5CjOOvhbhC9sW0hS4DjonSrDaQ25twQ__IyQrlYZO1SHsCrikYXpYZNSpjJcYZ_GIPA51PXT_C-g_DQMJ2IZ6adRa-UM6aH6KihWIboXo"
                    />
                </div>

                {/* Modules Section */}
                <h2 className={`${theme.typography.heading.h3} text-${theme.colors.text.primary} px-4 pb-3 pt-5`}>
                    Modules
                </h2>
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${theme.spacing.padding.page}`}>
                    {modules.map((module, index) => (
                        <div key={index} className="flex flex-col">
                            <div
                                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                                style={{ backgroundImage: `url(${module.image})` }}
                            />
                            <div className="mt-3">
                                <p className={`text-[${theme.colors.text.primary}] text-base font-medium leading-normal`}>
                                    {module.title}
                                </p>
                                <p className={`text-[${theme.colors.text.secondary}] text-sm font-normal leading-normal`}>
                                    {module.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Achievements Section */}
                <h2 className={`text-[${theme.colors.text.primary}] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5`}>
                    Achievements
                </h2>
                <div className="p-4">
                    <div className="flex items-stretch justify-between gap-4 rounded-xl">
                        <div className="flex flex-[2_2_0px] flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <p className={`text-[${theme.colors.text.primary}] text-base font-bold leading-tight`}>
                                    Code Conqueror
                                </p>
                                <p className={`text-[${theme.colors.text.secondary}] text-sm font-normal leading-normal`}>
                                    Completed 5 modules and earned 1000 XP.
                                </p>
                            </div>
                            <button
                                className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 flex-row-reverse bg-[${theme.colors.background.tertiary}] text-[${theme.colors.text.primary}] text-sm font-medium leading-normal w-fit`}
                            >
                                <span className="truncate">View Achievements</span>
                            </button>
                        </div>
                        <div
                            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                            style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuC63-qQiitPlMt7t59cGKZD1FDzRTZVtAA7471s0yBdK2Hf5lI1esEYlQhboJLniiJfCvx8W2rRNceOPPDUKmAxXFFDI13o1C1mq5XNfioJFV4dO_m4yISojydC384Fv_a73HFz605TIPgfhp1t_sG2ASr3_ntY1BoiVsy3aFcO2Ej3oHaSqj0XdyzBuioxjBZPrbp7DxqZR2vUlRgXE9kLzbXvpBr4ZlGNFauiRhcvZPfczZAI9VNISEmqIz2tGpm_Tpk8pVq-Ky1s)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Module data
const modules = [
    {
        title: "Python Fundamentals",
        description: "Learn the basics of Python programming language.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOVzfcHHLV7oiV1KQ-STzk9FYASDTb3eK7aW-_AkRswxuXhf332V7N7QQHRjNBDl-Dxm0leYXl5qJdJnhtO9D7DsYs_Ko70q6APPUTpJ9qhzyszbrsVD412e56OqR-yfz47TaGss5zvfQ_XbGgvKE-mwGXPP8vAA_0vQC9_jz3-vc7t6O47qS_L7kYW6J4S-XMQ3bCQpGtOcsQPhLwc7VKWW40Jd-XId0LEjrBya9ARe0citIozELE0vhSf_zkliJNpEBaxFMaJBOj"
    },
    {
        title: "Web Development Basics",
        description: "Build your first website using HTML, CSS, and JavaScript.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoORGORDPY85BGx45rAsDWcEQESeqJbV65GaS0H7mpHcYOqI1Mkq8BtfRcYbiVwAuTIPWYCjZ0Cx_SQPXpehHMVzv-L7ooeK_owymSPKWSQ_NxNxbNS56oHLvCH4oUpCcsfg7Zseb4DYTFJoBEDoIC5sTU7zVfcgqqj0i3YAoMESVr45p0lMVdodkrEwEyJk_wE2il9FUMNJchpte32s9MugB7d3fbgwjdWwMOK3uqtJN9FfpKSUf0ZCqI4bRbSJk629lhVQi4i1Rw"
    },
    {
        title: "Game Development with Pygame",
        description: "Create simple games using the Pygame library.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkWTqKYzKLwFlJ-mbukpXvErArhDB7YdoEV40iugp6LBK0dnaUTTSl8pRr6zhmhpEiWjmrjylfbEGqr8pBm9DukkjWVFJZYKnuhSWtCBhAfWHxxLJBK051yWl4JTYxfHTj-j00rN50AtbS4b2-23cR91NgNRwVZ8Zp77d9s9vGt-4fgO8C-sgEjBP23kXIc2nLrlEPMIa4QHwmv6vkAmoEzfKO0NVzSf4ODFrCS3dkH9LUXsoslV2lswFw_ILMnm_frug7r0DlMU0d"
    },
    {
        title: "Data Science for Beginners",
        description: "Explore data analysis and visualization techniques.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLV75dBR_JxoTZXyhIMoUClQ5UBJq4ZIdDAZ5Ara791_hyZGUcgPb5fdBoE7I_KH8kF8QzzOvAF3dLMkeS3CNXe3tNBZYkfoTVaKR3o2Rl5sLwgN6DqBo2RQuY7iNaQS1AxX12E_7BYYk4-3vVQCqheYo23kE1kHpX66iWNgLYqCvquutMGwsP3v7vTRDBxbo81AYoX4gb_5C2KIBRIJF4fEPqg7XmtfF74TOXjSCi4i4q5PWr0MlW9QXPUxl35I7lTntqtiuNfH56"
    }
];

export default Dashboard;