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
    Schema::create('assignment_submits', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('student_id');
      $table->foreign('student_id')->references('id')->on('students');
      $table->unsignedBigInteger('assignment_id');
      $table->foreign('assignment_id')->references('id')->on('assignments');
      $table->text('student_note')->nullable();
      $table->string('file')->nullable();
      $table->string('link')->nullable();
      $table->integer('score')->default(0);
      $table->text('teacher_note')->nullable();
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('assignment_submits');
  }
};
