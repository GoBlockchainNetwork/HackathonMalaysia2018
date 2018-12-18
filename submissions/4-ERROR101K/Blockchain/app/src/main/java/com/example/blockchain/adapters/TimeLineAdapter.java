package com.example.blockchain.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.blockchain.R;
import com.example.blockchain.models.Timeline;
import com.github.vipulasri.timelineview.TimelineView;

import java.util.List;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class TimeLineAdapter extends RecyclerView.Adapter<TimeLineAdapter.TimeLineViewHolder> {

    private List<Timeline> timelines;
    private Context context;

    public TimeLineAdapter(List<Timeline> timelines, Context context) {
        this.timelines = timelines;
        this.context = context;
    }

    @Override
    public int getItemViewType(int position) {
        return TimelineView.getTimeLineViewType(position, getItemCount());
    }

    @NonNull
    @Override
    public TimeLineViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_timeline, parent, false);
        return new TimeLineViewHolder(itemView, viewType);
    }

    @Override
    public void onBindViewHolder(@NonNull TimeLineViewHolder holder, int position) {
        Timeline timeline = timelines.get(position);
        holder.title.setText(timeline.getLocationName());
        holder.date.setText(timeline.getDate());

    }

    @Override
    public int getItemCount() {
        return (timelines != null ? timelines.size() : 0);
    }

    class TimeLineViewHolder extends RecyclerView.ViewHolder {

        private TextView date;
        private TextView title;
        private TimelineView timelineView;

        TimeLineViewHolder(View itemView, int viewType) {
            super(itemView);
            this.date = itemView.findViewById(R.id.text_timeline_date);
            this.title = itemView.findViewById(R.id.text_timeline_title);
            this.timelineView = itemView.findViewById(R.id.time_marker);
            timelineView.initLine(viewType);
        }
    }
}
