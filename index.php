<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Meme</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <?php
        $apiUrl = "https://meme-api.com/gimme";

        // Use file_get_contents to make the GET request
        $response = file_get_contents($apiUrl);

        // Check if the request was successful
        if ($response !== FALSE) {
            // Parse the JSON response
            $data = json_decode($response, true);

            // Check if the 'url' field is set (this is the direct image link)
            if (isset($data['url'])) {
                $imageUrl = $data['url'];  // This is the meme image URL
                echo "<img src='" . $imageUrl . "' alt='Random Meme' />";
            } else {
                echo "No image found in the API response.";
            }
        } else {
            echo "Error retrieving API data.";
        }
        ?>
        <div class="links">
            <!-- <a href="about.html">About Me</a> -->
            <a href="#" id="nextMeme">Next Meme</a>
        </div>
        <p>Made by <a id="link_style" href="https://nathanaeldousa.com/">Nathanael Dousa</a></p>
    </div>

    <script>
        // Add click event to refresh the page when "Next Meme" is clicked
        document.getElementById('nextMeme').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action of the link
            location.reload(); // Refresh the page
        });
    </script>

</body>
</html>
