<div>
    <h2>Login page</h2>
    <form action="/login" method="post">
        @csrf
        <label for="">Email or Phone</label><br>
        <input type="text" name="login" value="{{old('login')}}" >
        @error('login')
            <p style="color:red;">{{ $message }}</p>
        @enderror
        <br>

        <label for="">password</label><br>
        <input type="password" name="password" value="{{old('password')}}" >
        @error('password')
            <p style="color:red;">{{ $message }}</p>
        @enderror
        <br>
        <br>

        <button>Login</button>
    </form>
</div>
