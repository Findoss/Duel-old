const testBoard_1 = [
[1, 2, 3, 4, 5, 0],
[0, 1, 2, 3, 4, 5],
[0, 5, 0, 1, 2, 3],
[1, 5, 4, 0, 2, 1],
[5, 3, 1, 4, 1, 5],
[0, 1, 1, 2, 1, 1]];

const testBoard_1_drop = [
[0, 2, 0, 0, 5, 0],
[0, 1, 3, 4, 4, 5],
[0, 5, 2, 3, 2, 3],
[1, 5, 4, 1, 2, 1],
[1, 3, 1, 4, 1, 5],
[5, 1, 1, 2, 1, 1]];

const testBoard_2 = [
[1, 2, 3, 4, 0],
[0, 1, 2, 3, 5],
[0, 5, 0, 1, 3],
[1, 5, 4, 0, 1],
[5, 3, 1, 4, 5],
[0, 1, 1, 2, 1]];

const testBoard_3 = [
[1, 2, 3, 4, 0],
[0, 1, 2, 3, 5],
[0, 5, 0, 1, 3],
[1, 5, 4, 0, 1],
[5, 3, 1, 4, 5]];

const testBoard_4 = [
[1, 2, 3, 4, 5, 3],
[3, 1, 1, 1, 4, 5],
[4, 5, 4, 1, 2, 3],
[1, 5, 2, 4, 2, 1],
[5, 5, 4, 4, 4, 5],
[4, 1, 1, 4, 3, 3]];

const testBoard_4_del = [
[1, 2, 3, 4, 5, 3],
[3, 0, 0, 0, 4, 5],
[4, 0, 4, 1, 2, 3],
[1, 0, 2, 0, 2, 1],
[5, 0, 0, 0, 0, 5],
[4, 1, 1, 0, 3, 3]];

const testBoard_4_drop = [
[1, 0, 0, 0, 0, 3],
[3, 0, 0, 0, 5, 5],
[4, 0, 3, 0, 4, 3],
[1, 0, 4, 0, 2, 1],
[5, 2, 2, 4, 2, 5],
[4, 1, 1, 1, 3, 3]];

const testBoard_5 = [
[1, 1, 2, 5, 2, 3],
[1, 2, 4, 4, 5, 5],
[4, 3, 4, 1, 2, 5],
[1, 2, 3, 2, 1, 2],
[2, 5, 5, 3, 2, 5],
[3, 3, 4, 4, 2, 3]];

const testBoard_5_swap = [
[1, 1, 2, 5, 2, 3],
[1, 2, 4, 4, 5, 5],
[4, 3, 4, 1, 1, 5],
[1, 2, 3, 2, 2, 2],
[2, 5, 5, 3, 2, 5],
[3, 3, 4, 4, 2, 3]];

const testBoard_5_del = [
[1, 1, 2, 5, 2, 3],
[1, 2, 4, 4, 5, 5],
[4, 3, 4, 1, 1, 5],
[1, 2, 3, 0, 0, 0],
[2, 5, 5, 3, 0, 5],
[3, 3, 4, 4, 0, 3]];

const testBoard_5_drop = [
[1, 1, 2, 0, 0, 0],
[1, 2, 4, 5, 0, 3],
[4, 3, 4, 4, 0, 5],
[1, 2, 3, 1, 2, 5],
[2, 5, 5, 3, 5, 5],
[3, 3, 4, 4, 1, 3]];

const testBoard_5_del_2 = [
[1, 1, 2, 0, 0, 0],
[1, 2, 4, 5, 0, 3],
[4, 3, 4, 4, 0, 0],
[1, 2, 3, 1, 2, 0],
[2, 5, 5, 3, 5, 0],
[3, 3, 4, 4, 1, 3]];

const testBoard_5_drop_2 = [
[1, 1, 2, 0, 0, 0],
[1, 2, 4, 5, 0, 0],
[4, 3, 4, 4, 0, 0],
[1, 2, 3, 1, 2, 0],
[2, 5, 5, 3, 5, 3],
[3, 3, 4, 4, 1, 3]];

const testBoard_6 = [
[4, 4, 2, 4, 5, 3],
[4, 2, 3, 3, 2, 3],
[2, 2, 3, 1, 2, 1],
[2, 3, 1, 4, 1, 3],
[5, 1, 2, 5, 1, 4],
[2, 3, 4, 2, 3, 5]];

const testBoard_7 = [
[1, 2, 3],
[4, 5, 1],
[2, 3, 4]];

const testBoard_7_90 = [
[2, 3, 1],
[1, 2, 4],
[4, 2, 3]];