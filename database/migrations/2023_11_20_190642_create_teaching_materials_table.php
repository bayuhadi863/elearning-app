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
        Schema::create('teaching_materials', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('class_teacher_subject_id');
            $table->foreign('class_teacher_subject_id')->references('id')->on('class_teacher_subjects');
            $table->enum('type', ['document', 'video']);
            $table->string('document_file')->nullable();
            $table->text('video_link')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teaching_materials');
    }
};
