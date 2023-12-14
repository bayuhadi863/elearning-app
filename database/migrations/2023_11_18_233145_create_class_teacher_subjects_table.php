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
    Schema::create('class_teacher_subjects', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('teacher_id');
      $table->foreign('teacher_id')->references('id')->on('teachers');
      $table->unsignedBigInteger('subject_id');
      $table->foreign('subject_id')->references('id')->on('subjects');
      $table->unsignedBigInteger('class_id');
      $table->foreign('class_id')->references('id')->on('class');
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('class_teacher_subjects');
  }
};
