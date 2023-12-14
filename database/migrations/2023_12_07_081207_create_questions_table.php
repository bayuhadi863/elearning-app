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
    Schema::create('questions', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('quiz_id');
      $table->foreign('quiz_id')->references('id')->on('quizzes');
      $table->text('question');
      $table->text('correct_answer');
      $table->text('answer2');
      $table->text('answer3');
      $table->text('answer4');
      $table->integer('score');
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('questions');
  }
};
