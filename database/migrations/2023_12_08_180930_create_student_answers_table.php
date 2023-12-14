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
    Schema::create('student_answers', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('question_id');
      $table->foreign('question_id')->references('id')->on('questions');
      $table->unsignedBigInteger('quiz_id');
      $table->foreign('quiz_id')->references('id')->on('quizzes');
      $table->text('answer');
      $table->integer('score')->default(0);
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('student_answers');
  }
};
