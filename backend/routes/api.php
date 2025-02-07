<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//required

Route::post('/simulate-interests', function (Request $request) {
    $validated = $request->validate([
        'capital'  => 'required|numeric',
        'rate'  => 'required|numeric',
        'years'  => 'required|numeric',
    ]);
    $result = $validated['capital'] * (1 + ($validated['rate'] / $validated['years']));
    return response()->json(['result' => $result]);
});

//extra routes

// Cette route calcule les interets composés aussi, mais les noms de variables ne correspondent pas a la consigne, pour 
// rendre le frontend completement scalable
//elle revoie aussi de quoi visualiser la donnee.

Route::post('/simulate-compound-interests', function (Request $request) {
    $xAxis = [];
    $seriesData = [];

    $validated = $request->validate([
        'n1'  => 'required|numeric',
        'n2'  => 'required|numeric',
        'n3'  => 'required|numeric',
    ]);

    $principal = $validated['n1'];
    $rate = $validated['n2'] / 100;
    $years = $validated['n3'];
    $step = 1;


    for ($t = 0; $t <= $years; $t += $step) {
        $xAxis[] = round($t, 2);
    }

    foreach ($xAxis as $t) {
        $seriesData[] = $principal * pow((1 + $rate), $t);
    }

    return response()->json([
        'result' => end($seriesData),
        'chartData' => [
            'xAxis' => $xAxis,
            'series' => [
                [
                    'data' => $seriesData,
                ],
            ],
        ],
    ]);
});

//cette route calcule les interets simples
Route::post('/simulate-simple-interests', function (Request $request) {
    $validated = $request->validate([
        'n1'  => 'required|numeric',
        'n2'  => 'required|numeric',
        'n3'  => 'required|numeric',
    ]);
    $principal = $validated['n1'];
    $rate = $validated['n2'] / 100;
    $years = $validated['n3'];
    $step = 1;

    $xAxis = [];
    for ($t = 0; $t <= $years; $t += $step) {
        $xAxis[] = round($t, 2);
    }

    $seriesData = [];
    foreach ($xAxis as $t) {
        $seriesData[] = $principal * (1 + ($rate * $t));
    }
    return response()->json([
        'result' => end($seriesData),
        'chartData' => [
            'xAxis' => $xAxis,
            'series' => [
                [
                    'data' => $seriesData,
                ],
            ],
        ],
    ]);
});
//cette route calcule la depreciation lineaire
Route::post('/simulate-linear-depreciation', function (Request $request) {
    $validated = $request->validate([
        'n1'  => 'required|numeric',
        'n2'  => 'required|numeric',
        'n3'  => 'required|numeric',
    ]);

    $initialValue = $validated['n1'];
    $residualValue = $validated['n2'];
    $years = $validated['n3'];
    $depreciationPerYear = ($initialValue - $residualValue) / $years;

    $step = 1;

    $xAxis = [];
    for ($t = 0; $t <= $years; $t += $step) {
        $xAxis[] = round($t, 2);
    }

    for ($t = 0; $t <= $years; $t += $step) {
        $xAxis[] = $t;
        $currentValue = max($initialValue - ($depreciationPerYear * $t), $residualValue);
        $seriesData[] = round($currentValue, 2);
    }

    return response()->json([
        'result' => end($seriesData),
        'chartData' => [
            'xAxis' => $xAxis,
            'series' => [
                [
                    'data' => $seriesData,
                ],
            ],
        ],
    ]);
});
//cette route calcule la depreciation lineaire en fonction d'un temps donne.
//ex : Combien de temps avant que ma voiture perde la moitie de sa valeur ?
Route::post('/simulate-linear-depreciation-time', function (Request $request) {
    $validated = $request->validate([
        'n1'  => 'required|numeric',
        'n2'  => 'required|numeric',
        'n3'  => 'required|numeric',
    ]);

    $initialValue = $validated['n1'];
    $depreciationRate = $validated['n2'];
    $finalValue = $validated['n3'];

    $time = log($finalValue / $initialValue) / log(1 - $depreciationRate / 100);
    $result = ceil($time);
    $xAxis = [];
    $seriesData = [];

    for ($t = 0; $t <= $result; $t++) {
        $xAxis[] = $t;
        $seriesData[] = $initialValue * pow(1 - ($depreciationRate / 100), $t);
    }

    return response()->json([
        'result' => $result,
        'chartData' => [
            'xAxis' => $xAxis,
            'series' => [
                [
                    'data' => $seriesData,
                ],
            ],
        ],
    ]);
});
