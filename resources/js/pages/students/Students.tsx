import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/dashboard/students',
    },
];

export default function Students({ students = [], classes = [] }) {
    const [selectedClasses, setSelectedClasses] = useState<Record<number, number[]>>({});
    useEffect(() => {
        const initialSelected: Record<number, number[]> = {};
        students.forEach((student) => {
            initialSelected[student.id] = student.classes.map((cls) => cls.id);
        });
        setSelectedClasses(initialSelected);
    }, [students]);
    const handleCheckboxChange = (studentId: number, classId: number) => {
        setSelectedClasses((prev) => {
            const updated = { ...prev };
            if (!updated[studentId]) updated[studentId] = [];
            if (updated[studentId].includes(classId)) {
                updated[studentId] = updated[studentId].filter((id) => id !== classId);
            } else {
                updated[studentId].push(classId);
            }
            return updated;
        });
    };

    const handleSubmit = async (studentId: number) => {
        router.post(route('student.update.classes', studentId), {
            class_ids: selectedClasses[studentId] || [],
        });
        toast('new classes saved.');
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableCaption>A list of students.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button variant="outline">Edit Classes</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Classes for {student.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex flex-col gap-2">
                                                {classes.map((cls) => (
                                                    <label key={cls.id} className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedClasses[student.id]?.includes(cls.id) || false}
                                                            onChange={() => handleCheckboxChange(student.id, cls.id)}
                                                        />
                                                        {cls.name} ({cls.spec} - Year {cls.year})
                                                    </label>
                                                ))}
                                                <Button onClick={() => handleSubmit(student.id)} className="mt-4">
                                                    Save
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
