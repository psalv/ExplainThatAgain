
<!--

This module is a carousel displaying one full screen image at a time.
You may include as many photos as you wish in this carousel.
Currently the carousel moves only by itself; however, this can be altered a the bottom of the file.

-->

<div class="header header-filter carousel slide" style="" id="title-carousel" xmlns="//www.w3.org/1999/html"
     xmlns="//www.w3.org/1999/html">

    <!-- Used to determine the order of photos in the carousel -->
    <ol class="carousel-indicators hidden">
        <li data-target="#title-carousel" data-slide-to="0" class="active"></li>
        <li data-target="#title-carousel" data-slide-to="1" class=""></li>
        <li data-target="#title-carousel" data-slide-to="2" class=""></li>
        <li data-target="#title-carousel" data-slide-to="3" class=""></li>
        <li data-target="#title-carousel" data-slide-to="4" class=""></li>
    </ol>

    <div class="carousel-inner title-carousel">

        <!-- The active item is the item that will be in focus by default -->
        <div class="item active">
            <img src="http://placekitten.com/g/1000/411" style="width: 100%;" class="img-responsive">
            <div class="carousel-caption">

                <!-- To add captions use the following tag -->
                    <!--
                    <div class="carousel-caption">
                        <h4>Sample caption</h4>
                        <h4>Another sample caption line</h4>
                    </div>
                    -->

            </div>
        </div>

        <!-- Entries for each item in the carousel -->
        <div class="item">
            <img src="//placekitten.com/g/1000/402" style="width: 100%;" class="img-responsive">
        </div>
        <div class="item">
            <img src="//placekitten.com/g/1000/403" style="width: 100%;" class="img-responsive">
        </div>
        <div class="item">
            <img src="//placekitten.com/g/1000/404" style="width: 100%;" class="img-responsive">
        </div>
        <div class="item">
            <img src="//placekitten.com/g/1000/405" style="width: 100%;" class="img-responsive">
        </div>

        <!-- This allows you to move between the items using the arrow keys and mouse -->
        <a class="left carousel-control" href="#title-carousel" data-slide="prev"></a>
        <a class="right carousel-control" href="#title-carousel" data-slide="next"></a>

    </div>
</div>