<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class my_class extends Model
{
    protected $fillable = [
        'year',
        'spec',
        'name',
        'code',
        'teacher_id',
    ];

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'student_class', 'my_class_id', 'user_id')->withTimestamps();
    }
}
