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
    Schema::create('class', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->enum('grade', ['X', 'XI', 'XII']);
      $table->integer('student_entry_year');
      $table->unsignedBigInteger('class_teacher_id');
      $table->foreign('class_teacher_id')->references('id')->on('teachers');
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('class');
  }
};
