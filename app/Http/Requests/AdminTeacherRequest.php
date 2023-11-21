<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminTeacherRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'name' => 'required|regex:/^[A-Za-z ]+$/|max:255',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|min:8|string',
      'phone' => 'nullable|regex:/^\d{1,15}$/',
      'nip' => [
        'required',
        'regex:/^\d{18}$/',
        Rule::unique('teachers', 'nip'),
      ],
    ];
  }

  public function messages(): array
  {
    return [
      'name.max' => 'Nama harus kurang dari 255 karakter',
      'name.regex' => 'Nama harus berupa huruf',
      'email.unique' => 'Email sudah digunakan',
      'password.min' => 'Password harus minimal 8 karakter',
      'phone.regex' => 'Phone harus angka dengan maksimal 15 angka',
      'nip.regex' => 'NIP harus 18 angka',
      'nip.unique' => 'NIP sudah digunakan',
    ];
  }
}
