import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
                    <Card key={year} className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold">Year {year}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                {classList.map((cls) => (
                                    <li key={cls.id}>
                                        <Link
                                            href={route('dashboard.grades.class', { class_code: cls.code })}
                                            className="hover:bg-secondary group flex items-center rounded-md p-3 transition-colors duration-200"
                                        >
                                            <div className="flex flex-1 flex-col">
                                                <span className="group-hover:text-primary font-medium transition-colors duration-200">
                                                    {cls.name}
                                                </span>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {cls.spec}
                                                    </Badge>
                                                    <span className="text-muted-foreground text-xs">{cls.code}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
