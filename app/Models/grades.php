<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class grades extends Model
{
    protected $fillable = [
        'grade',
        'type',
        'user_id',
        'role',
    ];
}
