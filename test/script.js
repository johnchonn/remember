import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://meow-lb-1824082203.us-west-2.elb.amazonaws.com');
  sleep(1);
}