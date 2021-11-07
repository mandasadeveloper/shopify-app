<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Osiset\ShopifyApp\Contracts\ShopModel as IShopModel;
use Osiset\ShopifyApp\Traits\ShopModel;
class Profile extends Model
{
    use HasFactory;
    protected $table = 'profiles';
    protected $fillable = [  
        'shop_id',      
        'fname', 
        'lname',  
        'phone',      
        'fields',            
    ];
}
 