<?php
$counter_file = 'counter.txt';

// Check if the counter file exists, create it if not
if (!file_exists($counter_file)) {
    file_put_contents($counter_file, '0');
}

// Read the current count
$count = (int)file_get_contents($counter_file);

// Increment the count
$count++;

// Write the new count back to the file
file_put_contents($counter_file, (string)$count);

// Output the count for the webpage
echo $count;
?>
