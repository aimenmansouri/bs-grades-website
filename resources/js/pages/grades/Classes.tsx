import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Classes',
        href: '/dashboard/classes',
    },
];

export default function Classes({ classes = {} }) {
    console.log(classes);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {Object.entries(classes).map(([year, classList]) => (
                    <div key={year} className="">
                        <h2 className="text-lg">Year {year}</h2>
                        <ul className="p-2">
                            {classList.map((cls) => (
                                <li key={cls.id} className="rounded px-2 py-1 hover:bg-black/90">
                                    <Link href={route('dashboard.grades.class', { class_code: cls.code })} className="">
                                        <span className="">{cls.name}</span> ({cls.spec}) - {cls.code}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
