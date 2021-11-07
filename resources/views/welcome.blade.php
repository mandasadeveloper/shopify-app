@extends('shopify-app::layouts.default')
@section('content')
 
    <script>
        shopDomain = "{{ $shopDomain ?? Auth::user()->name }}";
        console.log(shopDomain);
        UrlHttp ="http://127.0.0.1:8000/api";
    </script>
<div id="root"></div>
<script src="./js/app.js"></script>
@endsection
@section('scripts')
    @parent
    <script>
        actions.TitleBar.create(app, { title: 'Welcome' });
    </script>
@endsection