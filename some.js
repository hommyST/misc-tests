/* 
Сикульный запрос, выдернуть холды
  SELECT hold_table.date1, hold_table.date2, call_log.agent_sip, call_log.queue
	FROM asterisk.hold_table, asterisk.call_log
    WHERE hold_table.agent = 6692 
    AND call_log.agent_sip = 6692
    AND call_log.uniqueid = hold_table.uniqueid
    AND call_log.queue BETWEEN 8700 AND 8703
	AND call_log.t1 BETWEEN '2021-11-01 00:00:00' AND '2021-11-30 23:59:59'
*/

let d1 = [
  '2021-11-30 16:59:00', '2021-11-30 16:28:11', '2021-11-30 10:52:54', '2021-11-30 10:00:02', '2021-11-30 09:51:26', '2021-11-29 11:59:19', '2021-11-29 11:50:39', '2021-11-29 09:17:54', '2021-11-29 09:14:17', '2021-11-26 16:00:31', '2021-11-26 12:50:04', '2021-11-26 10:47:28', '2021-11-26 10:11:02', '2021-11-26 09:35:30', '2021-11-25 17:48:48', '2021-11-25 14:31:52', '2021-11-25 14:28:57', '2021-11-25 12:17:22', '2021-11-25 11:56:04', '2021-11-25 10:35:34', '2021-11-25 10:15:47', '2021-11-22 11:07:00', '2021-11-22 10:09:32', '2021-11-22 09:16:36', '2021-11-21 18:53:55', '2021-11-21 15:45:30', '2021-11-21 11:01:06', '2021-11-21 09:10:33', '2021-11-18 19:53:37', '2021-11-18 19:34:09', '2021-11-18 18:53:12', '2021-11-18 18:49:30', '2021-11-17 19:56:56', '2021-11-17 16:11:12', '2021-11-17 13:18:34', '2021-11-17 12:18:01', '2021-11-17 12:13:17', '2021-11-17 09:41:18', '2021-11-17 09:18:31', '2021-11-17 09:12:26', '2021-11-17 09:08:01', '2021-11-14 12:55:47', '2021-11-14 12:50:10', '2021-11-14 12:48:19', '2021-11-14 12:09:32', '2021-11-14 11:06:56', '2021-11-14 10:59:44', '2021-11-14 10:42:41', '2021-11-14 10:40:53', '2021-11-14 09:12:01', '2021-11-14 09:05:33', '2021-11-10 17:15:26', '2021-11-10 15:20:27', '2021-11-10 14:03:17', '2021-11-10 12:19:20', '2021-11-10 09:41:34', '2021-11-09 19:53:04', '2021-11-09 18:08:56', '2021-11-09 15:13:46', '2021-11-09 15:12:24', '2021-11-09 13:14:22', '2021-11-09 11:07:36', '2021-11-09 10:58:41', '2021-11-09 09:21:51', '2021-11-09 09:04:07'
];
let d2 = [
  '2021-11-30 17:00:06', '2021-11-30 16:28:59', '2021-11-30 10:57:02', '2021-11-30 10:00:37', '2021-11-30 09:53:35', '2021-11-29 12:00:17', '2021-11-29 11:56:20', '2021-11-29 09:20:51', '2021-11-29 09:15:32', '2021-11-26 16:01:11', '2021-11-26 12:51:20', '2021-11-26 10:48:35', '2021-11-26 10:11:33', '2021-11-26 09:40:07', '2021-11-25 17:49:20', '2021-11-25 14:32:20', '2021-11-25 14:29:39', '2021-11-25 12:18:30', '2021-11-25 11:56:50', '2021-11-25 10:36:42', '2021-11-25 10:17:21', '2021-11-22 11:08:03', '2021-11-22 10:11:23', '2021-11-22 09:17:02', '2021-11-21 18:54:26', '2021-11-21 15:46:57', '2021-11-21 11:02:24', '2021-11-21 09:11:31', '2021-11-18 19:53:59', '2021-11-18 19:34:50', '2021-11-18 18:54:24', '2021-11-18 18:51:28', '2021-11-17 19:58:21', '2021-11-17 16:11:32', '2021-11-17 13:19:41', '2021-11-17 12:22:41', '2021-11-17 12:16:10', '2021-11-17 09:43:26', '2021-11-17 09:19:04', '2021-11-17 09:14:01', '2021-11-17 09:10:28', '2021-11-14 12:57:46', '2021-11-14 12:54:49', '2021-11-14 12:49:47', '2021-11-14 12:10:14', '2021-11-14 11:08:33', '2021-11-14 11:01:02', '2021-11-14 10:45:10', '2021-11-14 10:42:01', '2021-11-14 09:13:15', '2021-11-14 09:07:29', '2021-11-10 17:16:38', '2021-11-10 15:22:31', '2021-11-10 14:04:43', '2021-11-10 12:21:42', '2021-11-10 09:42:44', '2021-11-09 19:55:12', '2021-11-09 18:12:02', '2021-11-09 15:18:16', '2021-11-09 15:13:12', '2021-11-09 13:17:14', '2021-11-09 11:10:08', '2021-11-09 11:04:33', '2021-11-09 09:22:20', '2021-11-09 09:08:04'
];

let val = [];
d1.forEach((item,index) => {
  val.push((Math.abs(new Date(d2[index]) ) - Math.abs(new Date(item)) ) / 1000)
});

let res = val.reduce( (prev,curr) => prev + curr);
console.log(res);