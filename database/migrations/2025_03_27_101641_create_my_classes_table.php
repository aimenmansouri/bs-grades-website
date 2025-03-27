<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('my_classes', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger("year");
            $table->string("spec");
            $table->string("name");
            $table->string("code")->unique();
            $table->foreignId('teacher_id')->constrained(table: "users")->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_classes');
    }
};
