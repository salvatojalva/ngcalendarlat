<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Rol;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('users')->delete();

        $users = array(
                ['name' => 'Administrator', 'email' => 'admin', 'password' => Hash::make('admin')],
                ['name' => 'Salvador', 'email' => 'salva', 'password' => Hash::make('salva')]
        );
            
        // Loop through each user above and create the record for them in the database
        foreach ($users as $user)
        {
            User::create($user);
        }
        
        
        DB::table('rol')->delete();

        $roles = array(
                ['nombre' => 'Administrator'],
                ['nombre' => 'Teacher'],
                ['nombre' => 'Student']
        );
            
        // Loop through each user above and create the record for them in the database
        foreach ($roles as $rol)
        {
            Rol::create($rol);
        }

        Model::reguard();
    }
}
