<?php
function dd(...$variables) {
  echo '<pre>';
  var_dump($variables);
  echo '</pre>';
  die;
}

$db = new PDO(
  'mysql:host=127.0.0.1:3306;
  dbname=tests',
  'root',
  '1234'
);
$stmt = $db->query(
  "SELECT 
    agent,
    COUNT(duration) strCount,
    SUM(duration) sumDuration,
    queue
  FROM call_log 
  WHERE agent IS NOT NULL 
  GROUP BY agent, queue 
  ORDER BY 1"
);


?>
<table frame="void" style="border-spacing: 0.3rem;">
  <tr>
    <th>AGENT</th>
    <th>strCount</th>
    <th>sumDuration</th>
    <th>queue</th>
  </tr>
<?php
while ($row = $stmt->fetch()) {
  ?>
  <tr>
    <td><?= $row['agent'];?></td>
    <td><?= $row['strCount'];?></td>
    <td><?= $row['sumDuration'];?></td>
    <td><?= $row['queue'];?></td>
  </tr>
  <?php
}
?></table><?php




