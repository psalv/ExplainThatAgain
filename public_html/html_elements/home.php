
<div>

    <form id="submitUser" action="" method="post">

        <div class="row">
            <div class="col-md-6">
                <input type="text" id="formUser" placeholder="User Name">
            </div>
            <div class="col-md-6">
                <input type="password" id="formPass" placeholder="Password">
                <input type="password" id="formPassC" placeholder="Confirm Password">
            </div>
        </div>

        <div class="col-md-12 text-center">
            <button class="btn btn-raised btn-primary btn-lg">Send</button>
        </div>

        <div id="taken" class="hidden col-md-12 text-center">
            Username taken.
        </div>

        <div id="noMatch" class="hidden col-md-12 text-center">
            Passwords did not match.
        </div>

    </form>

</div>