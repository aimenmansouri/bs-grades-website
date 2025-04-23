<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class grades extends Model
{
    protected $fillable = [
        'grade',
        'type',
        'user_id',
        'role',
    ];

    public function class(): BelongsTo
    {
        return $this->belongsTo(my_class::class, 'my_class_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');

    }

    public function by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'by_id');

    }
}
