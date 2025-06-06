import { router, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Classes',
        href: '/dashboard/classes',
    },
];

type ClassForm = {
    year: string;
    spec: string;
    name: string;
    code: string;
    teacherId: number;
};

export default function Classes({ teachers = [], classes = [] }) {
    console.log('Classes:', classes);

    const { data, setData, post, errors, processing, reset } = useForm<ClassForm>({
        year: '',
        spec: '',
        name: '',
        code: '',
        teacherId: teachers.length > 0 ? teachers[0].id : 0,
    });

    useEffect(() => {
        setData('code', `${data.year}-${data.spec}-${data.name}`);
    }, [data.year, data.spec, data.name, setData]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('classes.store'), {
            preserveScroll: true,
        });
        reset();
    };

    const deleteClass = (id: number) => {
        if (!window.confirm('Are you sure you want to delete this class?')) return;

        router.delete(route('classes.destroy', id), {
            preserveScroll: true,
            onSuccess: () => console.log('Class deleted successfully'),
            onError: (errors) => console.error(errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Dialog>
                    <DialogTrigger>
                        <Button>Add class</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add new class</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Class Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    placeholder="Enter class name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    required
                                    placeholder="Enter year"
                                />
                                <InputError message={errors.year} />
                            </div>

                            <div>
                                <Label htmlFor="spec">Specialization</Label>
                                <Input
                                    id="spec"
                                    value={data.spec}
                                    onChange={(e) => setData('spec', e.target.value)}
                                    required
                                    placeholder="Enter specialization"
                                />
                                <InputError message={errors.spec} />
                            </div>

                            <div>
                                <Label htmlFor="code">Class Code</Label>
                                <Input
                                    disabled
                                    id="code"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    required
                                    placeholder="Enter class code"
                                />
                                <InputError message={errors.code} />
                            </div>

                            <div>
                                <Label htmlFor="teacher">Teacher</Label>
                                <select
                                    id="teacher"
                                    value={data.teacherId}
                                    onChange={(e) => setData('teacherId', Number(e.target.value))}
                                    className="w-full rounded-md border p-2"
                                >
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.teacherId} />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
                <Table>
                    <TableCaption>List of available classes and their teachers.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Specialization</TableHead>
                            <TableHead>Teacher</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {classes.map((cls, index) => (
                            <TableRow key={cls.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{cls.name}</TableCell>
                                <TableCell>{cls.code}</TableCell>
                                <TableCell>{cls.year}</TableCell>
                                <TableCell>{cls.spec}</TableCell>
                                <TableCell>{cls.teacher?.name || 'N/A'}</TableCell>
                                <TableCell>
                                    <Button onClick={() => deleteClass(cls.id)} variant="destructive">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
