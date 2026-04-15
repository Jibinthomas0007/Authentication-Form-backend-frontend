<div>
    <h2>Registration Page</h2>

    <form action="/register" method="post">
        @csrf 

        <label>Full Name</label><br>  
        <input type="text" name="fullname" value="{{ old('fullname') }}">
        @error('fullname')
            <p style="color:red;">{{ $message }}</p>
        @enderror
        <br>

        <label>Email or Phone</label><br>
        <input type="text" name="login" value="{{ old('login') }}">
        @error('login')
            <p style="color:red;">{{ $message }}</p>
        @enderror
        <br>

        <label>Password</label><br>
        <input type="password" name="password" value="{{ old('password') }}">
        @error('password')
            <p style="color:red;">{{ $message }}</p>
        @enderror
        <br>

        <label>Confirm Password</label><br>
        <input type="password" name="password_confirmation" value="{{ old('password_confirmation') }}">
        @error('password_confirmation')
            <p style="color:red;">{{ $message }}</p>
        @enderror
        <br><br>

        <button type="submit">
            Submit
        </button>
    </form>
</div>