# ipcs command

Display information about active IPC facilities (shared memory segments, message queues, and semaphores).

## Overview

The `ipcs` command shows information about System V inter-process communication (IPC) resources currently active in the system. It displays details about shared memory segments, message queues, and semaphore arrays, including their IDs, owners, permissions, and usage statistics.

## Options

### **-a**

Show all information for all three resources (default behavior).

```console
$ ipcs -a
------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages    
0x00000000 0          root       644        0            0           

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status      
0x00000000 0          root       644        80         2          dest         

------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00000000 0          root       644        1
```

### **-q**

Show information about active message queues.

```console
$ ipcs -q
------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages    
0x00000000 0          root       644        0            0
```

### **-m**

Show information about active shared memory segments.

```console
$ ipcs -m
------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status      
0x00000000 0          root       644        80         2          dest
```

### **-s**

Show information about active semaphore arrays.

```console
$ ipcs -s
------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00000000 0          root       644        1
```

### **-t**

Show time information for IPC facilities.

```console
$ ipcs -t -m
------ Shared Memory Operation/Change Times --------
shmid      last-op                    last-changed              
0          Wed May  5 10:15:35 2025   Wed May  5 10:15:35 2025
```

### **-p**

Show process IDs using or creating the IPC facilities.

```console
$ ipcs -p -m
------ Shared Memory Creator/Last-op PIDs --------
shmid      owner      cpid       lpid      
0          root       1234       5678
```

### **-c**

Show creator and owner information.

```console
$ ipcs -c -m
------ Shared Memory Segment Creators/Owners --------
shmid      perms      cuid       cgid       uid        gid       
0          644        0          0          0          0
```

## Usage Examples

### Display all IPC resources with detailed information

```console
$ ipcs -a
------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages    
0x00000000 0          root       644        0            0           

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status      
0x00000000 0          root       644        80         2          dest         

------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00000000 0          root       644        1
```

### Show limits for IPC resources

```console
$ ipcs -l
------ Messages Limits --------
max queues system wide = 32000
max size of message (bytes) = 8192
default max size of queue (bytes) = 16384

------ Shared Memory Limits --------
max number of segments = 4096
max seg size (kbytes) = 18014398509465599
max total shared memory (kbytes) = 18014398509481980
min seg size (bytes) = 1

------ Semaphore Limits --------
max number of arrays = 32000
max semaphores per array = 32000
max semaphores system wide = 1024000000
max ops per semop call = 500
semaphore max value = 32767
```

## Tips:

### Identify Resource Leaks

Use `ipcs` regularly to monitor IPC resources. If you notice resources that persist after applications terminate, it could indicate a resource leak that needs to be cleaned up.

### Clean Up Stale IPC Resources

Use `ipcrm` command to remove unused IPC resources identified by `ipcs`. For example, `ipcrm -m <shmid>` removes a shared memory segment.

### Check Resource Limits

Use `ipcs -l` to view system-wide limits for IPC resources. This helps in troubleshooting applications that might be hitting resource constraints.

## Frequently Asked Questions

#### Q1. What is the difference between the three IPC facilities?
A. Shared memory segments allow processes to share memory directly, message queues enable processes to exchange messages, and semaphores provide synchronization mechanisms between processes.

#### Q2. How do I remove an IPC resource?
A. Use the `ipcrm` command with the appropriate option and ID. For example, `ipcrm -m <shmid>` removes a shared memory segment, `ipcrm -q <msqid>` removes a message queue, and `ipcrm -s <semid>` removes a semaphore array.

#### Q3. Why do I see IPC resources that don't belong to any running process?
A. These are likely orphaned resources from processes that terminated without properly cleaning up. Use `ipcrm` to remove them if they're no longer needed.

#### Q4. How can I see which processes are using a specific IPC resource?
A. Use `ipcs -p` to show the process IDs (PIDs) of creators and last operators of IPC resources.

## References

https://man7.org/linux/man-pages/man1/ipcs.1.html

## Revisions

- 2025/05/05 First revision